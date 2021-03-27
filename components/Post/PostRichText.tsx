import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const PostRichText = ({ json, className = '' }) => {
  return <div className={className}>{documentToReactComponents(json)}</div>;
};

export default PostRichText;
