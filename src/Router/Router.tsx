import {
    createBrowserRouter
} from "react-router-dom";
import Root from "../Root/Root";
import ProductListPage from "../Pages/ProductListPage";
import ProductDetailPage from "../Pages/ProductDetailPage";



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
            }


        ],
    },
]);

export default router;