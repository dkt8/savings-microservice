import React from "react";
import { Card, Typography, Tag, Table, Space, Divider } from "antd";
import { ReadOutlined, GithubOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const services = [
  { key: "1", name: "Frontend", url: "http://localhost:3000", desc: "React UI — you're using it now" },
  { key: "2", name: "Kong gateway", url: "http://localhost:8000", desc: "Routes API calls to backend services" },
  { key: "3", name: "Kong admin", url: "http://localhost:8001", desc: "Gateway configuration API" },
  { key: "4", name: "Product service", url: "http://localhost:8081", desc: "Saving products catalog" },
  { key: "5", name: "Account service", url: "http://localhost:8082", desc: "Customer savings accounts" },
  { key: "6", name: "Product DB", url: "localhost:5433", desc: "PostgreSQL for product-service" },
  { key: "7", name: "Account DB", url: "localhost:5434", desc: "PostgreSQL for account-service" },
  { key: "8", name: "Grafana", url: "http://localhost:3001", desc: "Monitoring dashboards" },
  { key: "9", name: "Prometheus", url: "http://localhost:9090", desc: "Metrics scraper" },
];

const columns = [
  {
    title: "Service",
    dataIndex: "name",
    key: "name",
    render: (t) => <strong>{t}</strong>,
  },
  {
    title: "URL",
    dataIndex: "url",
    key: "url",
    render: (u) =>
      u.startsWith("http") ? (
        <a href={u} target="_blank" rel="noreferrer">
          <code>{u}</code>
        </a>
      ) : (
        <code>{u}</code>
      ),
  },
  { title: "What it is", dataIndex: "desc", key: "desc" },
];

const codeBlockStyle = {
  background: "#f5f5f5",
  padding: 16,
  borderRadius: 4,
  fontFamily: "ui-monospace, Menlo, monospace",
  fontSize: 13,
  whiteSpace: "pre",
  overflowX: "auto",
};

export default function ReadmePage() {
  return (
    <div>
      <Title level={2}>
        <ReadOutlined /> Core Saving — Banking Microservices
      </Title>
      <Paragraph>
        A small banking demo built as a 1-day group homework. Two Spring Boot
        services (product + account), a React + Vite frontend, Kong as the API
        gateway, and a Grafana + Prometheus monitoring stack — all wired up with
        Docker Compose.
      </Paragraph>

      <Card title="Tech stack" style={{ marginTop: 16 }}>
        <Space wrap>
          <Tag color="green">Java + Spring Boot</Tag>
          <Tag color="blue">React + Vite</Tag>
          <Tag color="cyan">PostgreSQL 16</Tag>
          <Tag color="orange">Kong API Gateway</Tag>
          <Tag color="purple">Prometheus + Grafana</Tag>
          <Tag color="geekblue">Docker Compose</Tag>
          <Tag>Kubernetes (k8s/)</Tag>
        </Space>
      </Card>

      <Card title="Services" style={{ marginTop: 16 }}>
        <Table
          columns={columns}
          dataSource={services}
          pagination={false}
          size="small"
        />
        <Paragraph type="secondary" style={{ marginTop: 12, marginBottom: 0 }}>
          The backend services return <code>404</code> at <code>/</code> —
          that's expected. Real endpoints live under <code>/api/v1/...</code>
          and are routed through Kong on port <code>8000</code>.
        </Paragraph>
      </Card>

      <Card title="Quick start" style={{ marginTop: 16 }}>
        <div style={codeBlockStyle}>
{`git clone https://github.com/dkt8/savings-microservice.git
cd savings-microservice
docker compose up --build`}
        </div>
        <Paragraph type="secondary" style={{ marginTop: 12, marginBottom: 0 }}>
          First build takes a few minutes (npm install + Gradle build).
          Subsequent runs are fast.
        </Paragraph>
      </Card>

      <Card title="Stopping & cleaning up" style={{ marginTop: 16 }}>
        <div style={codeBlockStyle}>
{`docker compose down      # stop containers, keep databases
docker compose down -v   # stop AND wipe all DB data`}
        </div>
      </Card>

      <Divider />

      <Paragraph type="secondary" style={{ textAlign: "center" }}>
        <GithubOutlined />{" "}
        <a
          href="https://github.com/dkt8/savings-microservice"
          target="_blank"
          rel="noreferrer"
        >
          dkt8/savings-microservice
        </a>
      </Paragraph>
    </div>
  );
}
