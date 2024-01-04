import { useRequest } from '@umijs/max';
import { Card, List } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import type { ListItemDataType } from '../../data.d';
import { queryFakeList } from '../../service';
import AvatarList from '../AvatarList';
import useStyles from './index.style';

// https://day.js.org/docs/en/plugin/relative-time
dayjs.extend(relativeTime);

const Projects: React.FC = () => {
  const { styles } = useStyles();
  // 获取tab列表数据
  const { data: listData } = useRequest(() => {
    return queryFakeList({
      count: 30,
    });
  });
  return (
    <List<ListItemDataType>
      className={styles.coverCardList}
      rowKey="id"
      grid={{
        // 响应式卡片布局
        gutter: 24,
        // 设置不同屏幕下的列数
        xxl: 3,
        xl: 2,
        lg: 2,
        md: 2,
        sm: 2,
        xs: 1,
      }}
      dataSource={listData?.list || []}
      renderItem={(item) => (
        // List.Item 负责处理列的样式(间距,列宽)
        <List.Item>
          {/*
            .card
              .card-cover
              .card-body
                .card-meta
              .card-actions
           */}
          <Card className={styles.card} hoverable cover={<img alt={item.title} src={item.cover} />}>
            <Card.Meta title={<a>{item.title}</a>} description={item.subDescription} />
            <div className={styles.cardItemContent}>
              <span>{dayjs(item.updatedAt).fromNow()}</span>
              <div className={styles.avatarList}>
                <AvatarList size="small" maxLength={2}>
                  {item.members.map((member) => (
                    <AvatarList.Item
                      key={`${item.id}-avatar-${member.id}`}
                      src={member.avatar}
                      tips={member.name}
                    />
                  ))}
                </AvatarList>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};
export default Projects;
