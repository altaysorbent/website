import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import styles from './PostRichText.module.scss';

const options = {
  renderNode: {
    [BLOCKS.LIST_ITEM]: (node) => {
      const UnTaggedChildren = documentToReactComponents(node, {
        renderNode: {
          [BLOCKS.PARAGRAPH]: (node, children) => children,
          [BLOCKS.LIST_ITEM]: (node, children) => children,
        },
      });

      return <li> {UnTaggedChildren} </li>;
    },
  },
};

const PostRichText = ({ json, className = '' }) => {
  return (
    <div className={[className, styles.richText].join(' ')}>
      {documentToReactComponents(json, options)}
    </div>
  );
};

export default PostRichText;
