import { Link, Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu, theme } from 'antd';
import logo from "../../public/logo.png";
const { Header, Content, Footer } = Layout;

const Root = () => {
    const navigate = useNavigate();
    const items = [
        {
            key: '1',
            label: 'Home',
            onClick: () => navigate('/'),
        }
    ];
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                }}
            >
                <div className=" shadow-white " >
                    <Link to="/"><img src={logo} alt="Logo" className="h-10 bg-white p-1" /></Link>
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}
                />

            </Header>
            <Content className="p-0">
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                M360 ICT ©{new Date().getFullYear()} Created by Rafidul
            </Footer>
        </Layout>
    );
};

export default Root;