import Breadcrumbs, { BreadcrumbsProps } from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Key } from "react";

function PayaBreadcrumbs(props: PayaBreadcrumbsPropsType) {
    const { links, current, ...restProps } = props;

    return (
        <Breadcrumbs {...restProps}>
            {links.map((link) => (
                <Link key={link.id} color="inherit" href={link.href}>
                    {link.title}
                </Link>
            ))}
            <Typography color="textPrimary">{current}</Typography>
        </Breadcrumbs>
    );
}

export default PayaBreadcrumbs;

interface PayaBreadcrumbsPropsType extends BreadcrumbsProps {
    links: { id: Key; title: string; href?: string }[];
    current: string;
}
