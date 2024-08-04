import React from "react";
import GeneralBoard from '../pages/BoardPage/GeneralBoard';
import GeneralDetail from '../pages/BoardPage/BoardDetail/GeneralDetail';
import GeneralEditor from '../pages/BoardPage/BoardEdit/GeneralEditor';
import TipBoard from '../pages/BoardPage/TipBoard';
import TipDetail from '../pages/BoardPage/BoardDetail/TipDetail';
import TipsEditor from '../pages/BoardPage/BoardEdit/TipsEditor';
import FoodBoard from '../pages/BoardPage/FoodBoard';
import FoodDetail from '../pages/BoardPage/BoardDetail/FoodDetail';
import FoodEditor from '../pages/BoardPage/BoardEdit/FoodEditor';
import PostWriter from '../pages/BoardPage/PostWriter';
import { RouteObject } from 'react-router-dom';

const boardRoutes: RouteObject[] = [
    {   
        path: "/board",
        element: <div>{/* Board layout or parent component */}</div>,
        children: [
            {
                path: "general",
                element: <GeneralBoard />,
                children: [
                    { 
                        path: ":id", 
                        element: <GeneralDetail /> 
                    },
                    { 
                        path: "edit/:id", 
                        element: <GeneralEditor /> 
                    }
                ]
            },
            { 
                path: "tips",
                element: <TipBoard />,
                children: [
                    { 
                        path: ":id", 
                        element: <TipDetail /> 
                    },
                    { 
                        path: "edit/:id", 
                        element: <TipsEditor /> 
                    }
                ]
            },
            {
                path: "food",
                element: <FoodBoard />,
                children: [
                    { 
                        path: ":id", 
                        element: <FoodDetail /> 
                    },
                    { 
                        path: "edit/:id", 
                        element: <FoodEditor /> 
                    }
                ]
            },
            {
                path: "postform", 
                element: <PostWriter /> 
            }
        ]
    }   
];

export default boardRoutes;