import React from "react";
import { Form, Input, InputNumber, Button, Select, message, Card } from "antd";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../api/productApi";
import { openAccount } from "../../api/accountApi";

export default function OpenAccountPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { data: products, isLoading: loadingProducts } = useQuery({
    queryKey: ["products/active"],
    queryFn: async () => {
      const all = await getProducts();
      return all.filter(p => p.active);
    }
  });

  const mutation = useMutation({
    mutationFn: openAccount,
    onSuccess: (data) => {
      message.success(`Mở tài khoản thành công! Số TK: ${data.accountNo}`);
      navigate(`/accounts/${data.id}`);
    },
    onError: (err) => message.error(err.message || "Lỗi khi mở tài khoản")
  });

  const onFinish = (values) => {
    mutation.mutate(values);
  };

  return (
    <Card title="Mở Tài Khoản Tiết Kiệm Mới" style={{ maxWidth: 600, margin: "0 auto" }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Mã Khách Hàng (Customer ID)" name="customerId" rules={[{ required: true, message: "Vui lòng nhập Customer ID" }]}>
          <Input placeholder="Ví dụ: CUS001" />
        </Form.Item>

        <Form.Item label="Chọn Sản Phẩm Tiết Kiệm" name="productCode" rules={[{ required: true, message: "Vui lòng chọn sản phẩm" }]}>
          <Select placeholder="Chọn gói tiết kiệm" loading={loadingProducts}>
            {products?.map(p => (
              <Select.Option key={p.productCode} value={p.productCode}>
                {p.productName} (Kỳ hạn: {p.tenorMonths}T - Lãi suất: {p.interestRate}%)
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Số Tiền Gửi" name="depositAmount" rules={[{ required: true, type: "number", min: 50000, message: "Số tiền tối thiểu là 50,000" }]}>
          <InputNumber formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Đơn Vị Tiền Tệ" name="currency" initialValue="VND" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="VND">VND</Select.Option>
            <Select.Option value="USD">USD</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={mutation.isPending} block>
            Xác Nhận Mở Tài Khoản
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
