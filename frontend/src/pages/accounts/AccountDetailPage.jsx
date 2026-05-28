import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Button, Space, Tag, Spin, message, Modal } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAccountById, freezeAccount, unfreezeAccount, closeAccount } from "../../api/accountApi";

export default function AccountDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: account, isLoading, error } = useQuery({
    queryKey: ["account", id],
    queryFn: () => getAccountById(id),
  });

  const mutationConfig = (successMsg) => ({
    onSuccess: () => {
      message.success(successMsg);
      queryClient.invalidateQueries(["account", id]);
    },
    onError: (err) => message.error(err.message || "Thao tác thất bại")
  });

  const freezeMutate = useMutation({ mutationFn: freezeAccount, ...mutationConfig("Đã phong tỏa tài khoản thành công") });
  const unfreezeMutate = useMutation({ mutationFn: unfreezeAccount, ...mutationConfig("Đã giải tỏa tài khoản thành công") });
  const closeMutate = useMutation({ mutationFn: closeAccount, ...mutationConfig("Đã đóng tài khoản thành công") });

  if (isLoading) return <div style={{ textAlign: "center", padding: 50 }}><Spin size="large" /></div>;
  if (error) return <Card title="Lỗi">Không tìm thấy tài khoản hoặc hệ thống xảy ra sự cố.</Card>;

  const getStatusTag = (status) => {
    const config = {
      ACTIVE: { color: "green", text: "Đang Hoạt Động" },
      FROZEN: { color: "blue", text: "Đang Phong Tỏa" },
      CLOSED: { color: "red", text: "Đã Đóng / Tất Toán" },
      PENDING_APPROVAL: { color: "orange", text: "Chờ Duyệt" },
      MATURED: { color: "purple", text: "Đến Hạn" }
    };
    const item = config[status] || { color: "default", text: status };
    return <Tag color={item.color}>{item.text}</Tag>;
  };

  return (
    <Card title={`Chi Tiết Tài Khoản Tiết Kiệm: ${account.accountNo}`} extra={<Button onClick={() => navigate(-1)}>Quay lại</Button>}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Mã Hệ Thống (UUID)">{account.id}</Descriptions.Item>
        <Descriptions.Item label="Số Tài Khoản">{account.accountNo}</Descriptions.Item>
        <Descriptions.Item label="Mã Khách Hàng">{account.customerId}</Descriptions.Item>
        <Descriptions.Item label="Mã Gói Sản Phẩm">{account.productCode}</Descriptions.Item>
        <Descriptions.Item label="Số Dư Hiện Tại">
          **{account.balance.toLocaleString()} {account.currency}**
        </Descriptions.Item>
        <Descriptions.Item label="Trạng Thái Vòng Đời">{getStatusTag(account.status)}</Descriptions.Item>
        <Descriptions.Item label="Ngày Đáo Hạn">{account.maturityDate || "Chưa xác định"}</Descriptions.Item>
      </Descriptions>

      <div style={{ marginTop: 24, textAlign: "right" }}>
        <Space size="middle">
          {account.status === "ACTIVE" && (
            <Button type="primary" danger onClick={() => Modal.confirm({ title: "Xác nhận phong tỏa", content: "Bạn chắc chắn muốn đóng băng tài khoản này?", onOk: () => freezeMutate.mutate(id) })}>
              Phong Tỏa (Freeze)
            </Button>
          )}

          {account.status === "FROZEN" && (
            <Button type="primary" style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }} onClick={() => unfreezeMutate.mutate(id)}>
              Giải Tỏa (Unfreeze)
            </Button>
          )}

          {account.status !== "CLOSED" && (
            <Button danger onClick={() => Modal.confirm({ title: "Xác nhận đóng tài khoản", content: "Tất toán tài khoản này? Hành động không thể hoàn tác.", onOk: () => closeMutate.mutate(id) })}>
              Tất Toán Đóng Tài Khoản (Close)
            </Button>
          )}
        </Space>
      </div>
    </Card>
  );
}
