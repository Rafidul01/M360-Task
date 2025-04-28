import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../services/productApi";
import { Alert, Card, Col, Image,  Row, Space, Spin} from "antd";




const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: product, isLoading, isError } = useGetProductByIdQuery(Number(id));

    if (isLoading) return <Spin size="large" className="w-full flex justify-center" />;
    if (isError) return <Alert message="Error fetching product details" type="error" showIcon />;

    

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <Row gutter={[24, 24]}>
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

                
            </Row>
        </div>
    );
};

export default ProductDetailPage;