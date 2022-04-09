import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const ContactNumber = (): JSX.Element => (
  <a
    className="cursor-pointer text-green-900"
    href="https://wa.me/77779898998"
    rel="noreferrer nofollow"
    target="_blank"
  >
    <FontAwesomeIcon height={16} icon={faWhatsapp} />
    &nbsp;+7 (777) 989-89-98 (только Whatsapp)
  </a>
);

export default ContactNumber;
