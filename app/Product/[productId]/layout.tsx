const CategoryLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex  min-h-screen  ">
      <main  className="w-full">{children}</main>
    </section>
  );
};
export default CategoryLayout;
