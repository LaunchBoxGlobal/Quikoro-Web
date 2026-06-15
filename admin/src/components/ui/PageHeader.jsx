import SearchField from "./SearchField";

const PageHeader = ({ title }) => (
  <div className="w-full flex items-center justify-between gap-3 flex-wrap">
    <h2 className="page-title">{title}</h2>
    <SearchField />
  </div>
);

export default PageHeader;
