// components/Navigation.tsx
import Link from "next/link";

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/liked">Liked Songs</Link>
                </li>
                <li>
                    <Link href="/playlists">Playlists</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;