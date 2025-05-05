import React from 'react';
import "./BannerLock.css"

const BannerLock = () => {
  return (
    <section className="banner-block">
      <div className="tw-relative tw-w-full banner-block__wrapper">
        <a
          href="https://www.coolmate.me/collection/do-casual?itm_source=homepage&itm_medium=homepage_banner_section1&itm_campaign=/image/April2025/casual_-_Desktop_a2.jpg&itm_content=/image/April2025/casual_-_Desktop_a2.jpg"
          ga-tracking-value="bannersection-vitri1"
          ga-tracking-label="SẢN PHẨM MẶC HẰNG NGÀY"
          className="tw-block tw-w-full"
        >
          <div className="tw-w-full tw-h-full">
            <img
              loading="lazy"
              src="https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2025/casual_-_Desktop_a2.jpg"
              alt="CASUALWEAR COLLECTION"
              style={{ width: '100%', aspectRatio: '3 / 1', objectFit: 'cover' }}
            />
          </div>
        </a>
        <div className="banner-block__content black container">
          <h2 className="banner-block__heading" style={{ textTransform: 'uppercase' }}>
            WINNER COLLECTION
          </h2>
          <p className="banner-block__descriptions">
          SAVE 5$ WHEN YOU SPEND MORE THAN 50$
          </p>
          <div className="banner-block__button">
            <a
              href=""
              className="tw-inline-flex tw-items-center tw-gap-1 md:tw-gap-2 tw-font-criteria md:tw-text-base tw-text-sm tw-font-normal tw-px-3 md:tw-px-12 tw-pt-2 tw-pb-[5px] md:tw-py-4 tw-rounded-full tw-uppercase tw-bg-cm-neutral-00 md:tw-text-cm-neutral-900 hover:tw-bg-cm-neutral-100"
            >
              SHOP NOW
              <span className="tw-mb-1">
                <svg
                  width="20"
                  height="12"
                  viewBox="0 0 20 12"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.5303 6.53033C19.8232 6.23744 19.8232 5.76256 19.5303 5.46967L14.7574 0.696698C14.4645 0.403804 13.9896 0.403805 13.6967 0.696698C13.4038 0.989591 13.4038 1.46446 13.6967 1.75736L17.9393 6L13.6967 10.2426C13.4038 10.5355 13.4038 11.0104 13.6967 11.3033C13.9896 11.5962 14.4645 11.5962 14.7574 11.3033L19.5303 6.53033ZM6.55671e-08 6.75L19 6.75L19 5.25L-6.55671e-08 5.25L6.55671e-08 6.75Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerLock;