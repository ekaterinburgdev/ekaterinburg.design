import { useEffect, useRef } from "react";
import { ProjectsPanel, PROJECT_DESIGN } from "ekb";
import throttle from "../../utils/thottle";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import "ekb/style.css";

const cx = classNames.bind(styles);

export default function Menu({ items }) {
  const menuList = useRef(null);

  useEffect(() => {
    const linkWithElementList = [
      ...menuList.current.querySelectorAll(`.${cx("menu__list-item")}`),
    ]
      .reverse()
      .map((link) => {
        const element = document.querySelector(link.getAttribute("href"));
        return { link, element };
      });

    const throttledHandleScroll = throttle(() => {
      let currentLink = null;

      for (const { link, element } of linkWithElementList) {
        if (isElementInViewport(element)) {
          link.classList.add(cx("menu__list-item_active"));
          currentLink = link;
          break;
        }
      }

      for (const { link } of linkWithElementList) {
        if (currentLink !== link) {
          link.classList.remove(cx("menu__list-item_active"));
        }
      }
    }, 100);

    window.addEventListener("scroll", throttledHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  return (
    <>
      <ProjectsPanel activeProjectId={PROJECT_DESIGN.id} />
      {items && (
        <>
          <div className={cx("menu")}>
            <ul className={cx("menu__list")} ref={menuList}>
              {items.map(({ title, link }) => (
                <a href={link} className={cx("menu__list-item")} key={title}>
                  {title}
                </a>
              ))}
            </ul>

            <a
              className={cx("menu__button")}
              href="mailto:mail@ekaterinburg.design"
            >
              Написать нам
            </a>
          </div>
        </>
      )}
    </>
  );
}

function isElementInViewport(el, percentVisible = 10) {
  let rect = el.getBoundingClientRect(),
    windowHeight = window.innerHeight || document.documentElement.clientHeight;

  return !(
    Math.floor(100 - ((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100) <
      percentVisible ||
    Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) <
      percentVisible
  );
}
