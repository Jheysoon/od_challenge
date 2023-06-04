import React from 'react';

import numeral from 'numeral';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Appbar, Card, List} from 'react-native-paper';

import {api} from '../../api';
import {CASH} from '../../api/mockData';
import Loading from '../../components/UI/Loading';
import LineGraphComponent from '../../components/home/LineGraphComponent';
import Colors from '../../constants/Colors';

const HomeScreen = () => {
  const {data, isLoading} = api.endpoints.getApi.useQuery();

  return (
    <>
      <Appbar.Header
        mode="center-aligned"
        style={{backgroundColor: Colors.primary}}>
        <Appbar.Content color="#ffffff" title="Home" />
      </Appbar.Header>

      {isLoading && <Loading />}

      <ScrollView>
        <LineGraphComponent />
        {data && (
          <View style={{margin: 10}}>
            <Card>
              <Card.Title
                title="Cash"
                titleStyle={{fontSize: 20, fontWeight: 'bold', marginTop: 14}}
              />
              <Card.Content>
                {CASH.map((record, index) => (
                  <List.Item
                    key={index}
                    title={record.bank}
                    description={record.label}
                    titleStyle={{fontSize: 12}}
                    descriptionStyle={{fontSize: 20, fontWeight: 'bold'}}
                    left={() => (
                      <List.Icon
                        icon="bank"
                        color="#fff"
                        style={{
                          backgroundColor: record.bgColor,
                          padding: 10,
                          borderRadius: 50,
                        }}
                      />
                    )}
                    right={() => (
                      <Text style={styles.amountText}>
                        {numeral(record.value).format('$0,0')}
                      </Text>
                    )}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: 'rgba(0, 0, 0, 0.08)',
                    }}
                  />
                ))}
              </Card.Content>
            </Card>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  amountText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
  },
});
