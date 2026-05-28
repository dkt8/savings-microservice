import React, { useState } from "react";
import { Table, Button, Tag, Space, Modal, InputNumber, message } from "antd";
import { PlusOutlined, EditOutlined, PoweroffOutlined } from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getProducts, updateProductRate, deactivateProduct } from "../../api/productApi";

export default function ProductListPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState(null);
  const [newRate, setNewRate] = useState(0);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const updateRateMutation = useMutation({
    mutationFn: updateProductRate,
    onSuccess: () => {
      message.success("Cập nhật lãi suất thành công!");
      queryClient.invalidateQueries(["products"]);
      setEditingProduct(null);
    },
    onError: (err) => message.error(err.message || "Có lỗi xảy ra"),
  });

  const deactivateMutation = useMutation({
    mutationFn: deactivateProduct,
    onSuccess: () => {
      message.success("Đã ngừng kích hoạt sản phẩm!");
      queryClient.invalidateQueries(["products"]);
    },
    onError: (err) => message.error(err.message || "Có lỗi xảy ra"),
  });

  const columns = [
    { title: "Mã Sản Phẩm", dataIndex: "productCode", key: "productCode" },
    { title: "Tên Sản Phẩm", dataIndex: "productName", key: "productName" },
    { title: "Kỳ Hạn (Tháng)", dataIndex: "tenorMonths", key: "tenorMonths" },
    { title: "Lãi Suất (%/năm)", dataIndex: "interestRate", key: "interestRate", render: (rate) => `**${rate}%**` },
    { title: "Tiền tệ", dataIndex: "currency", key: "currency" },
    { 
      title: "Trạng Thái", 
      dataIndex: "active", 
      key: "active",
      render: (active) => active ? <Tag color="green">ACTIVE</Tag> : <Tag color="red">INACTIVE</Tag>
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button 
            icon={<EditOutlined />} 
            disabled={!record.active}
            onClick={() => { setEditingProduct(record); setNewRate(record.interestRate); }}
          >
            Sửa Lãi Suất
          </Button>
          <Button 
            danger 
            icon={<PoweroffOutlined />} 
            disabled={!record.active}
            onClick={() => {
              Modal.confirm({
                title: "Xác nhận",
                content: `Bạn có chắc chắn muốn ngưng hoạt động sản phẩm ${record.productCode}?`,
                onOk: () => deactivateMutation.mutate(record.id),
              });
            }}
          >
            Deactivate
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <h2>Danh Sách Sản Phẩm Tiết Kiệm</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate("/products/create")}>
          Tạo Sản Phẩm Mới
        </Button>
      </div>

      <Table dataSource={products} columns={columns} rowKey="id" loading={isLoading} pagination={{ pageSize: 5 }} />

      <Modal
        title="Cập nhật Lãi Suất"
        open={!!editingProduct}
        onOk={() => updateRateMutation.mutate({ id: editingProduct.id, interestRate: newRate })}
        onCancel={() => setEditingProduct(null)}
      >
        <p>Sản phẩm: **{editingProduct?.productName}**</p>
        <InputNumber min={0} max={20} step={0.1} value={newRate} onChange={(val) => setNewRate(val)} style={{ width: "100%" }} />
      </Modal>
    </div>
  );
}
