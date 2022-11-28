import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import useAdmin from '../Hooks/useAdmin';
import useSeller from '../Hooks/useSeller';
import Header from '../Pages/Shared/Header/Header';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email)
    return (
        <div>
            <Header></Header>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-black">

                        <Link to='/dashboard/myorders'><li><a href='/'>My Orders</a></li></Link>
                        {
                            isSeller && <>
                                <Link to='/dashboard/myproducts'><li><a href='/'>My Products</a></li></Link>
                                <Link to='/dashboard/addproduct'><li><a href='/'>Add A Product</a></li></Link>
                            </>
                        }
                        {
                            isAdmin && <>
                                <Link to='/dashboard/allsellers'><li><a href='/'>All Sellers</a></li></Link>
                                <Link to='/dashboard/allbuyers'><li><a href='/'>All Buyers</a></li></Link>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;