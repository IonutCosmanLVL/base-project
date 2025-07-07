'use client';

export default function Footer() {
    return (
        <footer className="bg-secondary text-white py-4">
            <div className="container mx-auto text-center">
                <p className="text-sm text-primary">
                    &copy; {new Date().getFullYear()} Base Project. All rights reserved.
                </p>
            </div>
        </footer>
    );
}