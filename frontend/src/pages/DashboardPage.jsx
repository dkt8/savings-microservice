import React from "react";
import { Card, Col, Row, Statistic, Typography, Tag, Space } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const INTEREST_DATA = [4.1, 4.2, 4.5, 4.6, 4.8, 5.1, 5.0, 5.3, 5.2, 5.4, 5.7];
const FX_DATA = [23400, 23450, 23380, 23420, 23480, 23520, 23550, 23530, 23580, 23600, 23590];

function Sparkline({ data, stroke }) {
  const width = 460;
  const height = 180;
  const padding = 24;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = padding + (index * (width - 2 * padding)) / (data.length - 1);
      const y = height - padding - ((value - min) / range) * (height - 2 * padding);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%">
      <defs>
        <linearGradient id="sparkline-gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.3" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="3"
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points={`${points} ${width - padding},${height - padding} ${padding},${height - padding}`}
        fill="url(#sparkline-gradient)"
      />
      <circle cx={padding} cy={height - padding} r="0" fill="transparent" />
    </svg>
  );
}

export default function DashboardPage() {
  return (
    <div>
      <Title level={3}>Bảng điều khiển</Title>
      <Text type="secondary">Tổng quan sản phẩm tiết kiệm, lãi suất và tỷ giá hôm nay.</Text>

      <Row gutter={[20, 20]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Lãi suất trung bình"
              value={5.4}
              precision={1}
              suffix="%"
              valueStyle={{ color: "#3f8600" }}
            />
            <Space style={{ marginTop: 16 }}>
              <ArrowUpOutlined style={{ color: "#3f8600" }} />
              <Text strong>+0.4%</Text>
              <Text type="secondary">so với tuần trước</Text>
            </Space>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tỷ giá USD/VND"
              value={23590}
              precision={0}
              suffix="₫"
              valueStyle={{ color: "#1890ff" }}
            />
            <Space style={{ marginTop: 16 }}>
              <ArrowDownOutlined style={{ color: "#cf1322" }} />
              <Text strong>-0.05%</Text>
              <Text type="secondary">so với hôm qua</Text>
            </Space>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Tổng tài khoản" value={324} />
            <Tag color="blue" style={{ marginTop: 16 }}>Active: 218</Tag>
            <Tag color="orange" style={{ marginTop: 16 }}>Frozen: 76</Tag>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Tài khoản mới" value={28} />
            <Text type="secondary">trong 7 ngày qua</Text>
          </Card>
        </Col>
      </Row>

      <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
        <Col xs={24} lg={12}>
          <Card title="Diễn biến lãi suất (12 tháng)">
            <Sparkline data={INTEREST_DATA} stroke="#52c41a" />
            <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between" }}>
              <Text strong>Hiện tại: 5.4%</Text>
              <Text type="secondary">Tăng 0.4% so với tháng trước</Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Biến động tỷ giá USD/VND">
            <Sparkline data={FX_DATA} stroke="#1890ff" />
            <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between" }}>
              <Text strong>Hiện tại: 23,590 ₫</Text>
              <Tag color="processing">Ổn định</Tag>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
        <Col xs={24} lg={8}>
          <Card title="Tín hiệu nóng">
            <Space direction="vertical" size="middle">
              <Text strong>Quy mô tiết kiệm tăng 12% trong tuần</Text>
              <Text type="secondary">Số lượng giao dịch mở mới tăng cao do lãi suất cạnh tranh.</Text>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Dịch vụ nổi bật">
            <Tag color="gold">Tiết kiệm linh hoạt</Tag>
            <Tag color="cyan">Lãi suất ưu đãi</Tag>
            <Tag color="green">Hỗ trợ khách hàng 24/7</Tag>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Trạng thái hệ thống">
            <Text strong>Ổn định</Text>
            <div>
              <Tag color="success">All services good</Tag>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
