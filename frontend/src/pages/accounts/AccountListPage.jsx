import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, Table, Tag, Space, message, Typography } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAccountsByCustomerId, unfreezeAccount } from "../../api/accountApi";

const { Text } = Typography;

export default function AccountListPage() {
  const [customerId, setCustomerId] = useState("");
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: accounts = [], isFetching, isError, refetch } = useQuery({
    queryKey: ["accounts", searchId],
    queryFn: () => getAccountsByCustomerId(searchId),
    enabled: !!searchId,
    staleTime: 1000 * 60,
    retry: 1,
  });

  const unfreezeMutation = useMutation({
    mutationFn: unfreezeAccount,
    onSuccess: () => {
      message.success("Tài khoản đã được kích hoạt lại thành công.");
      queryClient.invalidateQueries(["accounts", searchId]);
    },
    onError: (err) => {
      message.error(err.message || "Không thể kích hoạt lại tài khoản.");
    },
  });

  const onFinish = () => {
    if (!customerId.trim()) {
      message.warning("Vui lòng nhập Customer ID để tìm danh sách tài khoản.");
      return;
    }

    setSearchId(customerId.trim());
    refetch();
  };

  const columns = [
    {
      title: "Số tài khoản",
      dataIndex: "accountNo",
      key: "accountNo",
    },
    {
      title: "Mã khách hàng",
      dataIndex: "customerId",
      key: "customerId",
    },
    {
      title: "Sản phẩm",
      dataIndex: "productCode",
      key: "productCode",
    },
    {
      title: "Số dư",
      key: "balance",
      render: (_, record) => `${record.balance?.toLocaleString() ?? 0} ${record.currency}`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const map = {
          ACTIVE: { color: "green", text: "Đang hoạt động" },
          FROZEN: { color: "blue", text: "Đang tạm khóa" },
          CLOSED: { color: "red", text: "Đã đóng" },
        };
        const item = map[status] || { color: "default", text: status };
        return <Tag color={item.color}>{item.text}</Tag>;
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => navigate(`/accounts/${record.id}`)}>
            Xem chi tiết
          </Button>
          {record.status === "FROZEN" && (
            <Button
              type="primary"
              onClick={() => unfreezeMutation.mutate(record.id)}
              loading={unfreezeMutation.isLoading}
            >
              Kích hoạt lại
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Card title="Danh sách tài khoản theo khách hàng" style={{ maxWidth: 1000, margin: "0 auto" }}>
      <Form layout="inline" onFinish={onFinish} style={{ marginBottom: 16 }}>
        <Form.Item>
          <Input
            placeholder="Nhập Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            allowClear
            style={{ minWidth: 280 }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tìm tài khoản
          </Button>
        </Form.Item>
      </Form>

      {!searchId && (
        <Text type="secondary">Nhập Customer ID để hiển thị các tài khoản đã mở và hỗ trợ kích hoạt lại tài khoản tạm khóa.</Text>
      )}

      {searchId && isError && (
        <Text type="danger">Có lỗi khi tải danh sách tài khoản. Vui lòng thử lại.</Text>
      )}

      <Table
        rowKey="id"
        columns={columns}
        dataSource={accounts}
        loading={isFetching}
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: searchId ? "Không tìm thấy tài khoản nào." : "" }}
      />
    </Card>
  );
}
