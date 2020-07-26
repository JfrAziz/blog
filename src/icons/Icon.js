import React from "react";

// This icon is modified version of Feather Icon to use in this project

const Icons = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ? props.size : 16}
      height={props.size ? props.size : 16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={props.strokeWidth ? props.strokeWidth : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      {props.children}
    </svg>
  );
};

const FIDownload = (props) => (
  <Icons {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </Icons>
);

const FIMinimize = (props) => (
  <Icons {...props}>
    <polyline points="4 14 10 14 10 20"></polyline>
    <polyline points="20 10 14 10 14 4"></polyline>
    <line x1="14" y1="10" x2="21" y2="3"></line>
    <line x1="3" y1="21" x2="10" y2="14"></line>
  </Icons>
);

const FIMaximize = (props) => (
  <Icons {...props}>
    <polyline points="15 3 21 3 21 9"></polyline>
    <polyline points="9 21 3 21 3 15"></polyline>
    <line x1="21" y1="3" x2="14" y2="10"></line>
    <line x1="3" y1="21" x2="10" y2="14"></line>
  </Icons>
);

const FIX = (props) => (
  <Icons {...props}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </Icons>
);

const FIEye = (props) => (
  <Icons {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </Icons>
);

const FIChevronDown = (props) => (
  <Icons {...props}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </Icons>
);

const FIMoreVertical = (props) => (
  <Icons {...props}>
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="12" cy="5" r="1"></circle>
    <circle cx="12" cy="19" r="1"></circle>
  </Icons>
);

const FITrash = (props) => (
  <Icons {...props}>
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </Icons>
);

const FIStar = (props) => (
  <Icons {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </Icons>
);

const FIEdit2 = (props) => (
  <Icons {...props}>
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </Icons>
);

const FISearch = (props) => (
  <Icons {...props}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </Icons>
);

const FIPlus = (props) => (
  <Icons {...props}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </Icons>
);

export { FIDownload };
export { FIMaximize };
export { FIMinimize };
export { FIX };
export { FIEye };
export { FIChevronDown };
export { FIMoreVertical };
export { FITrash };
export { FIStar };
export { FIEdit2 };
export { FISearch };
export { FIPlus };
