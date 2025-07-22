import { NestedListPropsType } from "types/components/nestedList";
import LinkItem from "./linkItem";
import WithChildrenLink from "./withChildrenLink";

function ReihanAsideNestedLinksList({ links }: { links: NestedListPropsType[] }) {
    return (
        <>
            {links.map((item: NestedListPropsType) => {
                if (!item.userHasAccess) return;
                if (item.children) return <WithChildrenLink key={item.id} item={item} />;
                return <LinkItem key={item.id} item={item} />;
            })}
        </>
    );
}

export default ReihanAsideNestedLinksList;
