import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Button, Form, Input, InputNumber, Select, Space, Spin, Typography } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useGetProductByIdQuery, usePatchProductMutation, useGetCategoriesQuery } from "../services/productApi";
import { Product } from "../types/product";

const { Title } = Typography;

const ProductEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [form] = Form.useForm();

    const { data: product, isLoading } = useGetProductByIdQuery(Number(id));
    const { data: categories } = useGetCategoriesQuery();
    const [patchProduct] = usePatchProductMutation();

    useEffect(() => {
        if (product) {
            form.setFieldsValue(product);
        }
    }, [product, form]);

    const onFinish = async (values: Product) => {
        console.log("Final Edited Product:", values);
        try {
            const response = await patchProduct({ id: Number(id), body: values }).unwrap();
            console.log("API PATCH Response:", response);
            setShowSuccessAlert(true);
            setTimeout(() => setShowSuccessAlert(false), 3000);

        } catch (error) {
            console.error("API PATCH Error:", error);
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 3000);
        }
    };

    if (isLoading || !product) return <div className="h-[calc(100vh-181px)] flex justify-center items-center"><Spin size="large" className="w-full flex justify-center" />;</div>



    return (
        <div>
            <div className="p-6 max-w-[900px] m-0 mx-auto border rounded-lg border-gray-200 shadow-lg" >
                <Title level={2}>Edit Product</Title>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={product}
                >
                    <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <Input.TextArea rows={3} />
                    </Form.Item>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>

                        <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item name="brand" label="Brand">
                            <Input />
                        </Form.Item>

                        <Form.Item name="category" label="Category">
                            <Select placeholder="Select a category">
                                {categories?.map((cat) => (
                                    <Select.Option key={cat.name} value={cat.slug}>
                                        {cat.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item name="availabilityStatus" label="Availability Status">
                            <Input />
                        </Form.Item>
                        <Form.Item name="warrantyInformation" label="Warranty Information">
                            <Input />
                        </Form.Item>
                        <Form.Item name="shippingInformation" label="Shipping Information">
                            <Input />
                        </Form.Item>

                        <Form.Item name="minimumOrderQuantity" label="Minimum Order Quantity">
                            <Input />
                        </Form.Item>
                        <Form.Item name="discountPercentage" label="Discount Percentage">
                            <Input />
                        </Form.Item>
                        <Form.Item name="returnPolicy" label="Return Policy">
                            <Input />
                        </Form.Item>
                    </div>

                    <Form.Item name="tags" label="Tags">
                        <Select mode="tags" style={{ width: "100%" }} />
                    </Form.Item>

                    {/* Reviews From.List diye*/}
                    <Form.List name="reviews">
                        {(fields, { add, remove }) => (
                            <>
                                <Title level={4}> Reviews </Title>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} align="baseline" style={{ display: "flex", marginBottom: 8 }} >
                                        <Form.Item
                                            {...restField}
                                            name={[name, "reviewerName"]}
                                            rules={[{ required: true, message: "Reviewer name required" }]}
                                        >
                                            <Input placeholder="Reviewer Name" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "comment"]}
                                            rules={[{ required: true, message: "Comment required" }]}
                                        >
                                            <Input placeholder="Comment" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "rating"]}
                                            rules={[{ required: true, message: "Rating required" }]}
                                        >
                                            <InputNumber placeholder="Rating" min={1} max={5} />
                                        </Form.Item>
                                        <Button danger onClick={() => remove(name)} icon={<MinusCircleOutlined />} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                                        Add Review
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save Changes
                        </Button>
                    </Form.Item>
                </Form>

            </div>
            {showSuccessAlert && (
                <div className="fixed bottom-15 right-0 z-50 w-full max-w-sm p-4">
                    <Alert
                        message="Product updated successfully!"
                        type="success"
                        showIcon
                        closable
                        onClose={() => setShowSuccessAlert(false)}

                    />
                </div>
            )}
            {
                showErrorAlert && (
                    <div className="fixed bottom-15 right-0 z-50 w-full max-w-sm p-4">
                        <Alert
                            message="Error updating product!"
                            type="error"
                            showIcon
                            closable
                            onClose={() => setShowErrorAlert(false)}

                        />
                    </div>
                )
            }
        </div>


    );
};

export default ProductEditPage;
