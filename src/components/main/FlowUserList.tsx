import React, { useEffect, useState } from "react";
import Tabs from '@/components/common/Tabs'
import { IMarket } from "@/types/stock";
import Card from "../common/Card";

const FlowUserList: React.FC = () => {
    const [markets, setMarkets] = useState<IMarket[]>([]);

    return (
        <div className="w-full">
            <div className="flex">
                <Card title={"test"}></Card>
                <Card title={"test"}></Card>
                <Card title={"test"}></Card>
                <Card title={"test"}></Card>
                <Card title={"test"}></Card>
                <Card title={"test"}></Card>
                <Card title={"test"}></Card>
                <Card title={"test"}></Card>
                <Card title={"test"}></Card>
            </div>
        </div>
    );
};

export default FlowUserList;
