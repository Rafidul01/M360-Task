import { useState } from "react";
import { useGetProductsQuery } from "../services/productApi";
import { Table, Pagination, Button, Space, Image, Spin, Tag, FloatButton } from 'antd';
import { Link } from "react-router-dom";
import { Product } from "../types/product";
import { ArrowDownOutlined, ArrowUpOutlined, EditOutlined } from "@ant-design/icons";

const ProductListPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showAll, setShowAll] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

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
          className="rounded-lg max-h-32 object-cover "
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
      render: (value: number) => (
        <Tag
          color="green"
          className="flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 font-semibold text-sm px-3 py-[2px] rounded-lg"
        >
          <span className="text-yellow-500 font-bold mr-1">$</span>{value}
        </Tag>
      )
    },
    {
      title: 'Action',
      render: (record: Product) => (
        <div className="flex gap-2">
          <Link to={`/products/${record.id}`}>
            <Button
              type="default"
              className="rounded-md border-gray-300 hover:border-blue-500 text-blue-600 hover:text-blue-700 px-4 shadow-sm"
            >
              View
            </Button>
          </Link>
          <Link to={`/product/edit/${record.id}`}>
            <Button
              type="primary"
              danger
              icon={<EditOutlined />}
              className="rounded-md px-4 shadow-sm"
            >
              Edit
            </Button>
          </Link>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <div>
        <h1 className="text-3xl font-bold mb-8">Product List</h1>

      </div>
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

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mt-8 px-4 w-full max-w-[1000px]">
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
            responsive={false}
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
      {
        (showAll || pageSize > 20 ) && <div>

          <FloatButton
            icon={<ArrowUpOutlined />}
            type="default"
            onClick={scrollToTop} 
            style={{
              bottom: 80,
              right: 24,
              
            }}
            
          />
          <FloatButton
            icon={<ArrowDownOutlined />}
            type="default"
            onClick={scrollToBottom}
            style={{
              bottom: 24,
              right: 24
            }}
          />

        </div>
      }
    </div>
  );
};

export default ProductListPage;
