import {
    createBrowserRouter
} from "react-router-dom";
import Root from "../Root/Root";
import ProductListPage from "../Pages/ProductListPage";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path:"/",
                element: <ProductListPage/>
            }


        ],
    },
]);

export default router;