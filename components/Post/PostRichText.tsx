import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import styles from './PostRichText.module.scss';

const PostRichText = ({ content, className = '' }) => {
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

      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const img = content.links.assets.block.find(
          (i) => i.sys.id === node.data.target.sys.id
        );
        return <img alt={img?.title} src={img?.url} />;
      },
    },
  };

  return (
    <div className={[className, styles.richText].join(' ')}>
      {documentToReactComponents(content.json, options)}
    </div>
  );
};

export default PostRichText;
