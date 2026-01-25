import React from 'react';

const DashboardLayout = ({children,}: Readonly<{children: React.ReactNode}>) => {
    return (
        <div>
            <div>
                Sidebar
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout;