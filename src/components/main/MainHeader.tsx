import { useRouter } from "next/router";
import { Button } from "..";

const MainHeader: React.FC = () => {
    const router = useRouter();

    const handleLoginClick = () => {
        router.push("/login");
    };

    return (
        <div className="flex justify-end">
            <Button
                size="medium"
                color="none"
                purpose="primary"
                onClick={handleLoginClick}
            >
                로그인
            </Button>
        </div>
    );
};

export default MainHeader;
