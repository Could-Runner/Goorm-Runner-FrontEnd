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
        path: "board",
        children: [
            {
                path: "general",
                children: [
                    {
                        index: true,
                        element: <GeneralBoard />
                    },
                    { 
                        path: ":id", 
                        element: <GeneralDetail /> 
                    },
                    { 
                        path: "edit/:id", 
                        element: <GeneralEditor /> 
                    },
                    {
                        path: "postform", 
                        element: <PostWriter /> 
                    }
                ]
            },
            { 
                path: "tips",
                children: [
                    {
                        index: true,
                        element: <TipBoard />
                    },
                    { 
                        path: ":id", 
                        element: <TipDetail /> 
                    },
                    { 
                        path: "edit/:id", 
                        element: <TipsEditor /> 
                    },
                    {
                        path: "postform", 
                        element: <PostWriter /> 
                    }
                ]
            },
            {
                path: "food",
                children: [
                    {
                        index: true,
                        element: <FoodBoard />
                    },
                    { 
                        path: ":id", 
                        element: <FoodDetail /> 
                    },
                    { 
                        path: "edit/:id", 
                        element: <FoodEditor /> 
                    },
                    {
                        path: "postform", 
                        element: <PostWriter /> 
                    }
                ]
            }            
        ]
    }   
];

export default boardRoutes;