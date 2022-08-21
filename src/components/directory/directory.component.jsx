import CategoryItem from "../category-item/category-item.component";
import "./directory.styles.scss";

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {/* Anywhere you want to use JavaScript inside html-looking code, use a curly bracket. */}
      {categories.map((category) => (
        // provide a key for the outer most container for looping
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
