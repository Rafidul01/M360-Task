import { useState } from "react";
import { useGetProductsQuery } from "../services/productApi";
import { Table, Pagination, Button, Space, Image, Spin } from 'antd';
import { Link } from "react-router-dom";
import { Product } from "../types/product";
import { EditOutlined } from "@ant-design/icons";

const ProductListPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showAll, setShowAll] = useState(false);

  const { data, isFetching } = useGetProductsQuery({
    skip: showAll ? 0 : (page - 1) * pageSize,
    limit: showAll ? 0 : pageSize
  });

  if (isFetching) {
    return (
      <div className="h-[calc(100vh-181px)] flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  const columns = [
    {
      title: 'Image',
      render: (_: string, record: Product) => (
        <Image
          src={record.thumbnail}
          alt={record.title}
          width={80}
          height={60}
          style={{ borderRadius: 8, objectFit: 'cover' }}
          preview={{ mask: 'View' }}
        />
      ),
      dataIndex: 'thumbnail'
    },
    { title: 'Title', dataIndex: 'title' },
    {
      title: 'Brand',
      render: (_: string, record: Product) => record.brand || 'N/A',
      dataIndex: 'brand'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (value: number) => `$${value}`
    },
    {
      title: 'Action',
      render: (record: Product) => (
        <div className="flex gap-2">
          <Link to={`/products/${record.id}`}>
            <Button type="primary">View Details</Button>
          </Link>
          <Link to={`/product/edit/${record.id}`}>
            <Button type="primary" danger icon={<EditOutlined />}>
              Edit
            </Button>
          </Link>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <Space direction="vertical" className="w-full max-w-[1000px] mx-auto shadow-lg rounded-lg">
        <Table
          columns={columns}
          dataSource={data?.products}
          loading={isFetching}
          pagination={false}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          bordered
        />
      </Space>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mt-4 px-4 w-full max-w-[1000px]">
        {!showAll && (
          <Pagination
            current={page}
            total={data?.total}
            onChange={(newPage, newPageSize) => {
              setPage(newPage);
              setPageSize(newPageSize);
            }}
            pageSize={pageSize}
            showSizeChanger
            pageSizeOptions={['5', '10', '20', '50']}
          />
        )}
        <Button
          onClick={() => {
            setShowAll(prev => !prev);
            setPage(1); 
          }}
          type="dashed"
        >
          {showAll ? "Paginate View" : "Show All Products"}
        </Button>
      </div>
    </div>
  );
};

export default ProductListPage;
