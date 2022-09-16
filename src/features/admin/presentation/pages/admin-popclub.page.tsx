import { AdminPopclubTable } from "../tables/admin-popclub-table";

export function AdminPopclub() {
  return (
    <>
      {/* change page info here */}
      <div className="relative flex">
        <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-5 text-secondary">
          Popclub
        </h1>
      </div>
      <div className="font-['Bebas_Neue'] text-3xl ml-4 mr-4 mt-4">
        <AdminPopclubTable />
      </div>
    </>
  );
}
