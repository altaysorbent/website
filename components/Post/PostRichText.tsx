import {
  documentToReactComponents,
  type Options,
} from '@contentful/rich-text-react-renderer';
import {
  BLOCKS,
  type Document,
  Inline,
  ResourceLink,
} from '@contentful/rich-text-types';
import styles from './PostRichText.module.css';

interface IProps {
  content: {
    json: Document;
    links?: any;
  };
  className: string;
}
const PostRichText = ({
  content,
  className = '',
}: IProps): React.JSX.Element => {
  const options: Options = {
    renderNode: {
      [BLOCKS.LIST_ITEM]: (node) => {
        const UnTaggedChildren = documentToReactComponents(node as Document, {
          renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => children,
            [BLOCKS.LIST_ITEM]: (node, children) => children,
          },
        });

        return <li> {UnTaggedChildren} </li>;
      },

      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const img = content.links.assets.block.find(
          (i: any) => i.sys.id === node.data.target.sys.id
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
