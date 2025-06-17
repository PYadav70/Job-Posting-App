import Image from "next/image";
import Link from "next/link";

export default function Navbar(){
    return (
    
    <nav>
        <div>
            <div>
                <div>
                    <Link href={"/"}>
                    <Image src="/logo.png"
                    alt="job board logo"
                    width={40}
                    height={40}
                    />
                    <span>Job Board</span>
                    </Link>
                </div>

            </div>
        </div>
    </nav>
    )
}