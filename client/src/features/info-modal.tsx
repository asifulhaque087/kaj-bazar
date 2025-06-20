import { FC, ReactElement } from 'react';
import Button from 'src/shared/button/Button';
import { IModalProps } from 'src/shared/modals/interfaces/modal.interface';
import ModalBg from 'src/shared/modals/ModalBg';

const InfoModal: FC<IModalProps> = ({ onClose }): ReactElement => {
  return (
    <ModalBg>
      <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center">
        <div className="relative bottom-auto left-auto right-auto top-auto max-h-[90vh] min-w-[800px] bg-white p-4 text-[#404145] overflow-auto">
          <div className="border-grey pb-[10px] mb-[10px] w-full border-b text-left flex justify-between items-center gap-3">
            <h4 className="pb-2 text-[24px] font-bold text-center">Information</h4>

            <Button
              className="rounded bg-gray-200 px-6 py-3 text-center text-sm font-bold text-black focus:outline-none md:px-4 md:py-2 md:text-base"
              onClick={onClose}
              label="Cancel"
            />
          </div>

          {/* start */}
          <div className="mb-5 text-base">
            <div className="max-w-4xl mx-auto px-6 py-10">
              <h1 className="text-3xl font-bold text-blue-700 mb-6">Kaj-Bazar Microservice Project</h1>
              <p className="mb-4">
                A scalable freelance marketplace using microservices architecture, real-time communication, and polyglot persistence across
                <strong className="text-blue-600"> 8+</strong> services.
              </p>

              <h2 className="text-2xl font-semibold text-blue-600 mt-10 mb-4">Credentials</h2>

              <ul className="list-disc list-inside space-y-1 mb-8">
                <p className="mb-[10px] font-medium">If you want to test this application check below creadentials :) </p>
                <li>
                  user-one: <strong>joker@yahoo.com</strong>
                </li>
                <li>
                  user-two: <strong>batman@gmail.com</strong>
                </li>
                <li>
                  both-user-password: <strong>qwerty</strong>
                </li>
                <li>
                  etheral-mail: <strong>kian.herzog@ethereal.email</strong>
                </li>
                <li>
                  etheral-password: <strong>p99rZtgU5kVhY31Dds</strong>
                </li>
              </ul>

              <h2 className="text-2xl font-semibold text-blue-600 mt-10 mb-4">Services</h2>
              <ul className="list-disc list-inside space-y-1 mb-8">
                <li>1 - gateway-service</li>
                <li>2 - notification-service</li>
                <li>3 - auth-service</li>
                <li>4 - users-service</li>
                <li>5 - gig-service</li>
                <li>6 - chat-service</li>
                <li>7 - order-service</li>
                <li>8 - review-service</li>
                <li>client</li>
                <li>shared library</li>
              </ul>
              <h2 className="text-2xl font-semibold text-blue-600 mt-10 mb-4">Description</h2>
              <ul className="list-disc list-inside space-y-1 mb-8">
                <li>User can switch to buyer and seller</li>
                <li>Seller can create gigs</li>
                <li>Buyer can order</li>
                <li>Buyer can live chat with seller using WebSocket</li>
                <li>Seller can send offer</li>
                <li>Buyer can accept or reject this</li>
                <li>Account register</li>
                <li>Verify user through email</li>
                <li>Send emails when any important action happens</li>
                <li>Seller and buyer can communicate</li>
                <li>Buyer can make payment</li>
                <li>Search gig by name and category</li>
                <li>Search seller by username</li>
                <li>Access control</li>
                <li>Seed data in microservice application</li>
                <li>Order invoice</li>
                <li>Order activity tracker</li>
                <li>Buyer and seller can review each other</li>
                <li>Seller can propose for delivery extension</li>
                <li>Buyer can approve or reject it</li>
              </ul>
              <h2 className="text-2xl font-semibold text-blue-600 mt-10 mb-4">Feature</h2>
              <ul className="list-disc list-inside space-y-1 mb-8">
                <li>Backend with Node.js &amp; Express.js</li>
                <li>Frontend with React.js</li>
                <li>Communication between services using RabbitMQ</li>
                <li>Fetching data with Redux RTK Query</li>
                <li>Use MongoDB, PostgreSQL, MySQL for different services</li>
                <li>Realtime notifications &amp; chat using WebSocket &amp; Redis pub-sub architecture</li>
                <li>Database per service</li>
                <li>Caching with Redis</li>
                <li>Write tests using Jest</li>
                <li>GitHub CI/CD with VPS using SSH</li>
                <li>Containerize the services using Docker</li>
                <li>Use TypeScript for better error catching &amp; documentation</li>
              </ul>
              <h2 className="text-2xl font-semibold text-blue-600 mt-10 mb-4">Tech Stack</h2>
              <div className="mb-8 flex flex-wrap gap-[10px]">
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1 inline-block">React</div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1 inline-block">Redux</div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1 inline-block">Node.js</div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1 inline-block">Express.js</div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1 inline-block">RabbitMQ</div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1 inline-block">Docker</div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1 inline-block">TypeScript</div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1 inline-block">MongoDB</div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1 inline-block">MySQL</div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1 inline-block">PostgreSQL</div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1 inline-block">Redis</div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1 inline-block">Jest</div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1 inline-block">SSH</div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1 inline-block">CI/CD</div>
              </div>
              <h2 className="text-2xl font-semibold text-blue-600 mt-10 mb-4">Host</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>GitHub CI/CD</li>
                <li>Docker &amp; Docker Compose</li>
                <li>Hostinger VPS</li>
                <li>Nginx and Certbot Docker container</li>
              </ul>
            </div>
          </div>

          {/* end */}
        </div>
      </div>
    </ModalBg>
  );
};

export default InfoModal;
