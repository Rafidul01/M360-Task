import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Input, InputNumber, Select, Space, Spin, Typography, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useGetProductByIdQuery, usePatchProductMutation, useGetCategoriesQuery } from "../services/productApi";
import { Product } from "../types/product";

const { Title } = Typography;

const ProductEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();


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
            message.success("Product updated successfully!");
            console.log("API PATCH Response:", response);

        } catch (error) {
            console.error("API PATCH Error:", error);
        }
    };

    if (isLoading || !product) return <div className="h-[calc(100vh-181px)] flex justify-center items-center"><Spin size="large" className="w-full flex justify-center" />;</div>



    return (
        <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
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
    );
};

export default ProductEditPage;
