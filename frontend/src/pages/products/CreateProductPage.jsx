import React from "react";
import { Form, Input, InputNumber, Button, Select, message, Card } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../api/productApi";

export default function CreateProductPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      message.success("Tạo sản phẩm tiết kiệm thành công!");
      queryClient.invalidateQueries(["products"]);
      navigate("/products");
    },
    onError: (err) => {
      message.error(err.message || "Mã sản phẩm đã tồn tại hoặc dữ liệu không hợp lệ.");
    }
  });

  const onFinish = (values) => {
    mutation.mutate(values);
  };

  return (
    <Card title="Tạo Mới Sản Phẩm Tiết Kiệm" style={{ maxWidth: 600, margin: "0 auto" }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Mã sản phẩm" name="productCode" rules={[{ required: true, message: "Vui lòng nhập mã sản phẩm" }]}>
          <Input placeholder="Ví dụ: TK12M" />
        </Form.Item>

        <Form.Item label="Tên sản phẩm" name="productName" rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}>
          <Input placeholder="Ví dụ: Tiết kiệm kỳ hạn 12 tháng" />
        </Form.Item>

        <Form.Item label="Kỳ hạn (Tháng)" name="tenorMonths" rules={[{ required: true, type: "number", min: 1, message: "Kỳ hạn tối thiểu là 1 tháng" }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Lãi suất (%/năm)" name="interestRate" rules={[{ required: true, type: "number", min: 0, message: "Lãi suất không hợp lệ" }]}>
          <InputNumber step={0.05} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Loại tiền tệ" name="currency" initialValue="VND" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="VND">VND</Select.Option>
            <Select.Option value="USD">USD</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={mutation.isPending} block>
            Tạo Sản Phẩm
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
