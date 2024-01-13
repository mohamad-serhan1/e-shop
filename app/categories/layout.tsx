import Categories from "./category";

const CategoryLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex  min-h-screen  ">
      <aside>
        <Categories />
      </aside>
      <main className="w-3/4">{children}</main>
    </section>
  );
};
export default CategoryLayout;
