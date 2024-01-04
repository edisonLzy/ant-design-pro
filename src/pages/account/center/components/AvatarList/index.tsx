import { Avatar, Tooltip } from 'antd';
import classNames from 'classnames';
import React from 'react';
import useStyles from './index.style';
export declare type SizeType = number | 'small' | 'default' | 'large';
export type AvatarItemProps = {
  tips: React.ReactNode;
  src: string;
  size?: SizeType;
  style?: React.CSSProperties;
  onClick?: () => void;
};
export type AvatarListProps = {
  Item?: React.ReactElement<AvatarItemProps>;
  size?: SizeType;
  maxLength?: number;
  excessItemsStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  children: React.ReactElement<AvatarItemProps> | React.ReactElement<AvatarItemProps>[];
};

const avatarSizeToClassName = (styles:any,size?: SizeType | 'mini') =>
classNames(styles.avatarItem, {
  [styles.avatarItemLarge]: size === 'large',
  [styles.avatarItemSmall]: size === 'small',
  [styles.avatarItemMini]: size === 'mini',
});


const Item: React.FC<AvatarItemProps> = ({ src, size, tips, onClick = () => {} }) => {
  const { styles } = useStyles();
  const cls = avatarSizeToClassName(styles,size);
  return (
    <li className={cls} onClick={onClick}>
      {tips ? (
        <Tooltip title={tips}>
          <Avatar
            src={src}
            size={size}
            style={{
              cursor: 'pointer',
            }}
          />
        </Tooltip>
      ) : (
        <Avatar src={src} size={size} />
      )}
    </li>
  );
};

// 管理显示的元素个数以及Item的样式
const AvatarList: React.FC<AvatarListProps> & {
  Item: typeof Item;
} = ({ children, size, maxLength = 5, excessItemsStyle, ...other }) => {
  const { styles } = useStyles();
  //
  const numOfChildren = React.Children.count(children);
  const numToShow = Math.min(numOfChildren, maxLength);
  // React.ReactElement<AvatarItemProps> 约束 child's props的类型
  const childrenArray = React.Children.toArray(children) as React.ReactElement<AvatarItemProps>[];
  // 生成用于渲染的元素
  const childrenWithProps = childrenArray.slice(0, numToShow).map((child) =>
    React.cloneElement(child, {
      size,
    }),
  );
  if (numToShow < numOfChildren) {
    const cls = avatarSizeToClassName(styles,size);
    childrenWithProps.push(
      // 利用 负值 margin-left 实现头像重叠的效果
      <li key="exceed" className={cls}>
        {/* 显示 更多按钮 */}
        <Avatar size={size} style={excessItemsStyle}>{`+${numOfChildren - maxLength}`}</Avatar>
      </li>,
    );
  }
  return (
    <div {...other} className={styles.avatarList}>
      <ul> {childrenWithProps} </ul>
    </div>
  );
};
AvatarList.Item = Item;
export default AvatarList;
