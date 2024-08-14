import { useRouter } from "next/router";
import { Button } from "..";
import constants from "@/constants"
import { getItem, removeItem  } from "@/utils/localStorage"
import { useEffect, useState } from "react";

interface User {
    id: number;
    username: string;
}

const MainHeader: React.FC = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const loginStatus = getItem(constants.LOCAL_STORAGE.LOGIN.KEY) === "true";
        setIsLoggedIn(loginStatus);

        if (loginStatus) {
            const userData = getItem(constants.LOCAL_STORAGE.USER);
            if (userData) {
                setUser(JSON.parse(userData));
            }
        }        
    }, []);

    const handleLoginClick = () => {
        router.push("/login");
    };

    const handleLogoutClick = () => {
        removeItem(constants.LOCAL_STORAGE.LOGIN.KEY);
        removeItem(constants.LOCAL_STORAGE.USER);

        router.push("/");
    };

    return (
        <div className="flex justify-end">
            {isLoggedIn && user ? (
                <div className="flex items-center space-x-2">
                    <span className="font-medium">Welcome,</span>
                    <span className="font-bold text-blue-400">{user.username}</span>
                    <Button
                        size="medium"
                        color="none"
                        purpose="primary"
                        onClick={handleLogoutClick}
                        className="ml-4"
                    >
                        로그아웃
                    </Button>
                </div>
            ) : (
                <Button
                    size="medium"
                    color="none"
                    purpose="primary"
                    onClick={handleLoginClick}
                >
                    로그인
                </Button>
            )}
        </div>
    );
};

export default MainHeader;
