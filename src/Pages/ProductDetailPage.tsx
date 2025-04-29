import { Link, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../services/productApi";
import { Alert, Button, Card, Col, Descriptions, Image, Rate, Row, Space, Spin, Tag, Typography } from "antd";
import {EditOutlined} from '@ant-design/icons';
const { Text } = Typography;
 
const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: product, isLoading, isError } = useGetProductByIdQuery(Number(id));

    if (isLoading) return <Spin size="large" className="w-full flex justify-center" />;
    if (isError) return <Alert message="Error fetching product details" type="error" showIcon />;

    const priceAfterDiscount = product &&
        product.price - (product.price * (product.discountPercentage / 100));



    return (
        <div className="p-4 max-w-7xl mx-auto">
            <Row gutter={[24, 24]}>
                {/* {Image section} */}
                <Col xs={24} md={12}>
                    <Card className="h-full">
                        <Image.PreviewGroup>
                            <Space direction="vertical" className="w-full">
                                <div className="flex justify-center">
                                    <Image
                                        src={product?.images?.[0] || product?.thumbnail}
                                        alt={product?.title}
                                        className="rounded-lg max-h-96 object-cover"
                                    />
                                </div>
                                <Row gutter={[8, 8]}>
                                    {product?.images?.map((img, index) => (
                                        <Col key={index} xs={12} sm={8} md={12} lg={8}>
                                            <Image
                                                src={img}
                                                alt={`Product image ${index + 1}`}
                                                className="rounded-lg max-h-32 object-cover"
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </Space>
                        </Image.PreviewGroup>
                    </Card>
                </Col>

                <Col xs={24} md={12}>
                    <Space direction="vertical" className="w-full">
                        <div className="flex justify-between items-center">
                            <h1 className="md:text-2xl text-md  font-semibold" >{product?.title}</h1>
                            <Link to={`/product/edit/${product?.id}`}>
                                <Button type="primary" danger icon={<EditOutlined />} >Edit</Button>
                            </Link>

                        </div>


                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Brand">
                                {product?.brand || 'N/A'}
                            </Descriptions.Item>

                            <Descriptions.Item label="Price">
                                <Space>
                                    <Text delete className="text-gray-500">
                                        ${product?.price.toFixed(2)}
                                    </Text>
                                    <Text strong className="text-green-600">
                                        ${priceAfterDiscount?.toFixed(2)}
                                    </Text>
                                    <Tag color="red">-{product?.discountPercentage}%</Tag>
                                </Space>
                            </Descriptions.Item>

                            <Descriptions.Item label="Rating">
                                <Rate
                                    allowHalf
                                    defaultValue={product?.rating}
                                    disabled
                                    className="text-sm"
                                />
                                <Text className="ml-2">({product?.rating}/5)</Text>
                            </Descriptions.Item>

                            <Descriptions.Item label="Stock">
                                <Tag color={product?.stock ?? 0 > 0 ? 'green' : 'red'}>
                                    {product?.stock ?? 0 > 0 ? 'In Stock' : 'Out of Stock'}
                                </Tag>
                                ({product?.stock} units available)
                            </Descriptions.Item>

                            <Descriptions.Item label="Category">
                                <Tag color="blue">{product?.category}</Tag>
                            </Descriptions.Item>

                            {product?.warrantyInformation && (
                                <Descriptions.Item label="Warranty">
                                    {product?.warrantyInformation}
                                </Descriptions.Item>
                            )}

                            {product?.shippingInformation && (
                                <Descriptions.Item label="Shipment">
                                    {product?.shippingInformation}
                                </Descriptions.Item>
                            )}

                            {product?.minimumOrderQuantity && (
                                <Descriptions.Item label="Minimum Order">
                                    {product?.minimumOrderQuantity}
                                </Descriptions.Item>
                            )}

                            {product?.returnPolicy && (
                                <Descriptions.Item label="Return Policy">
                                    {product?.returnPolicy}
                                </Descriptions.Item>
                            )}

                            {product && product?.tags?.length > 0 && (
                                <Descriptions.Item label="Tags">
                                    <Space wrap>
                                        {product?.tags.map((tag, index) => (
                                            <Tag key={index}>{tag}</Tag>
                                        ))}
                                    </Space>
                                </Descriptions.Item>
                            )}
                        </Descriptions>

                        {/* Product Description */}
                        <Card title="Description" className="mt-4">
                            <Text>{product?.description}</Text>
                        </Card>

                        {/* Reviews Section */}
                        {product && product?.reviews && product?.reviews?.length > 0 && (
                            <Card title="Reviews" className="mt-4">
                                <Space direction="vertical" className="w-full ">
                                    {product?.reviews.map((review, index) => (
                                        <Card key={index} size="small" className="w-full">
                                            <Text strong>{review.reviewerName}</Text>
                                            <div className="mt-2">
                                                <Rate
                                                    defaultValue={review.rating}
                                                    disabled
                                                    className="text-sm ml-2"
                                                />
                                            </div>
                                            <Text className="block mt-1">{review.comment}</Text>
                                        </Card>
                                    ))}
                                </Space>
                            </Card>
                        )}
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default ProductDetailPage;