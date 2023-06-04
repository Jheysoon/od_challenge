import React from 'react';

import {useNavigation} from '@react-navigation/native';
import numeral from 'numeral';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, Card, List} from 'react-native-paper';

import {api} from '../../api';
import {TOP_EXPENDING_CATEGORIES} from '../../api/mockData';
import Loading from '../../components/UI/Loading';
import Colors from '../../constants/Colors';

const AllExpensesScreen = () => {
  const {data, isLoading} = api.endpoints.getApi.useQuery();
  const navigation = useNavigation();

  return (
    <>
      <Appbar.Header style={{backgroundColor: Colors.primary}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
          color={Colors.white}
        />
        <Appbar.Content color={Colors.white} title="Expenses" />
      </Appbar.Header>

      {isLoading && <Loading />}

      <ScrollView>
        <Card style={{marginTop: 10}}>
          <Card.Content>
            {data && (
              <View>
                <Card>
                  <Card.Title
                    title="All Spending Categories"
                    titleStyle={styles.cardTitle}
                  />
                  <Card.Content>
                    {TOP_EXPENDING_CATEGORIES.map((record, index) => (
                      <List.Item
                        key={index}
                        title={record.category}
                        description={
                          numeral(record.amount).format('$0,0.00') + ' spent'
                        }
                        titleStyle={{fontSize: 12}}
                        descriptionStyle={styles.descriptionStyle}
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
                    ))}
                  </Card.Content>
                </Card>
              </View>
            )}
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
};

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
  descriptionStyle: {
    fontSize: 20,
    fontWeight: '600',
  },
});

export default AllExpensesScreen;
