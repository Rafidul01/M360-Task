import {
    createBrowserRouter
} from "react-router-dom";
import Root from "../Root/Root";
import ProductListPage from "../Pages/ProductListPage";
import ProductDetailPage from "../Pages/ProductDetailPage";
import ProductEditPage from "../Pages/ProductEditPage";




const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path:"/",
                element: <ProductListPage/>
            },
            {
                path:"/products/:id",
                element: <ProductDetailPage/>
            },
            {
                path:"product/edit/:id",
                element: <ProductEditPage/>
            }


        ],
    },
]);

export default router;