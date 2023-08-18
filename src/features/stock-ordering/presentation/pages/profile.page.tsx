import { StockOrderHead, ProfileContent } from "../components";

export function ProfilePage() {
  return (
    <>
      <StockOrderHead
        StockOrderBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin/stock-order/dashboard",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Profile", url: "/admin/stock-order/order" }],
        }}
      />
      <div className="p-8">
        <ProfileContent />
      </div>
    </>
  );
}
