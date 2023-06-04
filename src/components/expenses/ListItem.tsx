import React from 'react';

import {StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import numeral from 'numeral';

type Props = {
  record: {
    category: string;
    amount: number;
    bgColor: string;
  };
};

const ListItem = ({record}: Props) => (
  <List.Item
    title={record.category}
    description={numeral(record.amount).format('$0,0.00') + ' spent'}
    titleStyle={{fontSize: 12}}
    descriptionStyle={{fontSize: 20, fontWeight: 'bold'}}
    left={() => (
      <List.Icon
        icon="clipboard-list"
        color="#fff"
        style={{
          backgroundColor: record.bgColor,
          padding: 10,
          borderRadius: 50,
        }}
      />
    )}
    right={() => <List.Icon icon="chevron-right" />}
    style={styles.bottomDivider}
  />
);

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 14,
  },
  amountText: {
    fontWeight: '600',
    fontSize: 20,
    marginTop: 10,
  },
  bottomDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
  },
});

export default ListItem;
