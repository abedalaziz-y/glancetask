import {
    AppstoreOutlined,
    ContainerOutlined,
    MenuFoldOutlined, FullscreenOutlined, FullscreenExitOutlined, ContactsOutlined, BgColorsOutlined,
    DashboardFilled, ProjectFilled, SendOutlined, SketchOutlined, TagFilled, BarcodeOutlined, ContainerFilled, MenuUnfoldOutlined

} from '@ant-design/icons';
import './nav.css'
import { Button, Menu } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Draggable from 'react-draggable';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
  
  
    getItem(<Link to='admin/dashboard'>DashBard</Link>, 'sub2', <DashboardFilled />, ),
   
   
    getItem('Categories', 'sub3', <ProjectFilled />, [
        getItem(<Link to='admin/categories'>Create</Link>, '10'),
        getItem(<Link to='admin/categories'>Update</Link>, '11'),
        getItem(<Link to='admin/categories'>Delete</Link>, '12'),
    ]),
    getItem('SubCategories', 'sub4', <ContainerOutlined />, [
        getItem(<Link to='admin/subcategory'>Create</Link>, '13'),
        getItem(<Link to='admin/subcategory'>Update</Link>, '14'),
        getItem(<Link to='admin/subcategory'>Delete</Link>, '15'),
    ]),
    
    getItem('Languages', 'sub6', <SketchOutlined />, [
        getItem(<Link to='admin/brands'>Create</Link>, '18'),

        getItem(<Link to='admin/brands'>Delete</Link>, '19'),
    ]),
    getItem('Movies/Series', 'sub7', <BarcodeOutlined />, [
        getItem(<Link to='admin/products'>View All</Link>, '20'),

        getItem(<Link to='admin/product'>Create</Link>, '21'),
        getItem(<Link to='admin/products'>Update</Link>, '22'),
        getItem(<Link to='admin/products'>Delete</Link>, '23'),
    ]),
];

const SideCool = () => {
    const [open,setOpen]=useState(false)
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const toggleOpen=()=>{
        setOpen(!open)
    }
    return (
    
       <div
   
            style={{
                position:"Fixed",
                width:150 ,zIndex:'1'
               
            }}
        >
                  
                <Button
                    type="primary"
                    onClick={toggleOpen}

                >
                    {open ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                </Button>
                <Button
                    type="primary"
                    onClick={toggleCollapsed}
                    className={open ? 'opend' : 'closed'}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
               
            <Menu
                    className={open ? 'opend' : 'closed'}
                defaultSelectedKeys={['1']}
           
                mode="vertical"
                theme="dark"
                
                inlineCollapsed={collapsed}
                items={items}
            />
        </div>

    );
};

export default SideCool;