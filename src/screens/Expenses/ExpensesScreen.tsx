import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, Card, List} from 'react-native-paper';

import {RootStackParamList} from '../../../types';
import {api} from '../../api';
import {TOP_EXPENDING_CATEGORIES} from '../../api/mockData';
import Loading from '../../components/UI/Loading';
import ListItem from '../../components/expenses/ListItem';
import PieChartComponent from '../../components/expenses/PieChartComponent';
import Colors from '../../constants/Colors';

const ExpensesScreen = () => {
  const {data, isLoading} = api.endpoints.getApi.useQuery();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const top6Expenses = TOP_EXPENDING_CATEGORIES.slice(0, 6);

  return (
    <>
      <Appbar.Header
        mode="center-aligned"
        style={{backgroundColor: Colors.primary}}>
        <Appbar.Content color={Colors.white} title="Expenses" />
      </Appbar.Header>

      {isLoading && <Loading />}

      <ScrollView>
        <Card>
          <Card.Content>
            <PieChartComponent />
          </Card.Content>
        </Card>

        <Card style={{marginTop: 10}}>
          <Card.Content>
            {data && (
              <View>
                <Card>
                  <Card.Title
                    title="Top Spending Categories"
                    titleStyle={styles.cardTitle}
                  />
                  <Card.Content>
                    {top6Expenses.map((record, index) => (
                      <ListItem key={index} record={record} />
                    ))}
                    <List.Item
                      title="View All Categories"
                      descriptionStyle={{fontSize: 20, fontWeight: '600'}}
                      right={() => <List.Icon icon="chevron-right" />}
                      style={[styles.bottomDivider, {marginLeft: -15}]}
                      onPress={() => {
                        navigation.navigate('AllExpensesScreen');
                      }}
                    />
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
  bottomDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
  },
});

export default ExpensesScreen;
