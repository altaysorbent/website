'use client';
import {
  EmailShareButton,
  FacebookShareButton,
  OKShareButton,
  TelegramShareButton,
  TwitterShareButton,
  VKShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  OKIcon,
  TelegramIcon,
  TwitterIcon,
  VKIcon,
  WhatsappIcon,
} from 'react-share';

interface IProps {
  url: string;
  title: string;
  className: string;
}

const PostShare = ({ url, title, className }: IProps): React.JSX.Element => {
  return (
    <div className={className}>
      <EmailShareButton subject={title} url={url}>
        <EmailIcon size={32} round />
      </EmailShareButton>
      <FacebookShareButton className="ml-2" title={title} url={url}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <OKShareButton className="ml-2" title={title} url={url}>
        <OKIcon size={32} round />
      </OKShareButton>
      <TelegramShareButton className="ml-2" title={title} url={url}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <TwitterShareButton className="ml-2" title={title} url={url}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <VKShareButton className="ml-2" title={title} url={url}>
        <VKIcon size={32} round />
      </VKShareButton>
      <WhatsappShareButton className="ml-2" title={title} url={url}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
};

export default PostShare;
