import { useState } from "react";
import { useGetProductsQuery } from "../services/productApi";
import { Table, Pagination, Button, Space, Image, Spin } from 'antd';
import { Link } from "react-router-dom";
import { Product } from "../types/product";
import { EditOutlined } from "@ant-design/icons";


const ProductListPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetProductsQuery({ skip: (page - 1) * 10, limit: 10 });

  if (isLoading) return <div className="h-[calc(100vh-181px)] flex justify-center items-center"><Spin size="large" className="w-full flex justify-center" />;</div>

  const columns = [
    {
      title: 'Image',
      render: (_: string, title: Product) => <Image
        src={title.thumbnail}
        alt={title.title}
        width={80}
        height={60}
        style={{
          borderRadius: 8,
          objectFit: 'cover'
        }}
        preview={{
          mask: 'View',
        }}
      />,
      dataIndex: 'thumbnail'
    },
    { title: 'Title', dataIndex: 'title' },
    {
      title: 'Brand',
      render: (_: string, record: Product) => record.brand || 'N/A',
      dataIndex: 'brand'
    },
    { title: 'Price', dataIndex: 'price', render: (value: number) => `$${value}` },
    {
      title: 'Action',
      render: (record: Product) => (
        <div className="flex gap-2">
          <Link to={`/products/${record.id}`}>
            <Button type="primary" >View Details</Button>
          </Link>
          <Link to={`/product/edit/${record?.id}`}>
            <Button type="primary" danger icon={<EditOutlined />} >Edit</Button>
          </Link>
        </div>

      ),
    },
  ];

  console.log(data);
  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <Space direction="vertical" className="w-full max-w-[1000px]  mx-auto shadow-lg">
        <Table
          columns={columns}
          dataSource={data?.products}
          loading={isLoading}
          pagination={false}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          bordered
          
        />
      </Space>
      <div className="flex justify-center mt-4">
        <Pagination
          current={page}
          total={data?.total}
          onChange={setPage}
          pageSize={10}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default ProductListPage;