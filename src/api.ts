import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CoopInfo = {
  __typename?: 'CoopInfo';
  id: Scalars['ID'];
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  alias: Scalars['String'];
};

export type RepositoryCountData = {
  __typename?: 'RepositoryCountData';
  involvedCount: Scalars['Int'];
  ownerCount: Scalars['Int'];
};

export type Language = {
  __typename?: 'Language';
  name: Scalars['String'];
  color: Scalars['String'];
  size: Scalars['Int'];
  level: Scalars['Int'];
};

export type LanguagesTotal = {
  __typename?: 'LanguagesTotal';
  size: Scalars['Int'];
  level: Scalars['Int'];
};

export type LanguagesData = {
  __typename?: 'LanguagesData';
  involvedLanguages: Array<Language>;
  involvedLanguagesTotal: LanguagesTotal;
  ownerLanguages: Array<Language>;
  ownerLanguagesTotal: LanguagesTotal;
};

export type GithubAnalysis = {
  __typename?: 'GithubAnalysis';
  repositoryCountData: RepositoryCountData;
  languagesData: LanguagesData;
};

export type Account = {
  __typename?: 'Account';
  id: Scalars['ID'];
  githubId?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  githubInfo?: Maybe<CoopInfo>;
  githubAnalysis?: Maybe<GithubAnalysis>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** accountを取得 */
  account: Account;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** acountを更新 */
  updateAccount: Account;
};


export type MutationUpdateAccountArgs = {
  input: AccountInput;
};

export type AccountInput = {
  name: Scalars['String'];
};

export type AccountItemFragment = (
  { __typename?: 'Account' }
  & Pick<Account, 'id' | 'githubId' | 'name' | 'createdAt' | 'updatedAt'>
  & { githubAnalysis?: Maybe<(
    { __typename?: 'GithubAnalysis' }
    & { repositoryCountData: (
      { __typename?: 'RepositoryCountData' }
      & Pick<RepositoryCountData, 'involvedCount' | 'ownerCount'>
    ), languagesData: (
      { __typename?: 'LanguagesData' }
      & { involvedLanguages: Array<(
        { __typename?: 'Language' }
        & LanguageItemFragment
      )>, involvedLanguagesTotal: (
        { __typename?: 'LanguagesTotal' }
        & LanguagesTotalItemFragment
      ), ownerLanguages: Array<(
        { __typename?: 'Language' }
        & LanguageItemFragment
      )>, ownerLanguagesTotal: (
        { __typename?: 'LanguagesTotal' }
        & LanguagesTotalItemFragment
      ) }
    ) }
  )> }
);

export type LanguageItemFragment = (
  { __typename?: 'Language' }
  & Pick<Language, 'name' | 'color' | 'size' | 'level'>
);

export type LanguagesTotalItemFragment = (
  { __typename?: 'LanguagesTotal' }
  & Pick<LanguagesTotal, 'size' | 'level'>
);

export type UpdateAccountMutationVariables = Exact<{
  input: AccountInput;
}>;


export type UpdateAccountMutation = (
  { __typename?: 'Mutation' }
  & { updateAccount: (
    { __typename?: 'Account' }
    & Pick<Account, 'name'>
  ) }
);

export type AccountQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountQuery = (
  { __typename?: 'Query' }
  & { account: (
    { __typename?: 'Account' }
    & AccountItemFragment
  ) }
);

export const LanguageItemFragmentDoc = gql`
    fragment LanguageItem on Language {
  name
  color
  size
  level
}
    `;
export const LanguagesTotalItemFragmentDoc = gql`
    fragment LanguagesTotalItem on LanguagesTotal {
  size
  level
}
    `;
export const AccountItemFragmentDoc = gql`
    fragment AccountItem on Account {
  id
  githubId
  name
  githubAnalysis {
    repositoryCountData {
      involvedCount
      ownerCount
    }
    languagesData {
      involvedLanguages {
        ...LanguageItem
      }
      involvedLanguagesTotal {
        ...LanguagesTotalItem
      }
      ownerLanguages {
        ...LanguageItem
      }
      ownerLanguagesTotal {
        ...LanguagesTotalItem
      }
    }
  }
  createdAt
  updatedAt
}
    ${LanguageItemFragmentDoc}
${LanguagesTotalItemFragmentDoc}`;
export const UpdateAccountDocument = gql`
    mutation updateAccount($input: AccountInput!) {
  updateAccount(input: $input) {
    name
  }
}
    `;
export type UpdateAccountMutationFn = Apollo.MutationFunction<UpdateAccountMutation, UpdateAccountMutationVariables>;

/**
 * __useUpdateAccountMutation__
 *
 * To run a mutation, you first call `useUpdateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountMutation, { data, loading, error }] = useUpdateAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAccountMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccountMutation, UpdateAccountMutationVariables>) {
        return Apollo.useMutation<UpdateAccountMutation, UpdateAccountMutationVariables>(UpdateAccountDocument, baseOptions);
      }
export type UpdateAccountMutationHookResult = ReturnType<typeof useUpdateAccountMutation>;
export type UpdateAccountMutationResult = Apollo.MutationResult<UpdateAccountMutation>;
export type UpdateAccountMutationOptions = Apollo.BaseMutationOptions<UpdateAccountMutation, UpdateAccountMutationVariables>;
export const AccountDocument = gql`
    query account {
  account {
    ...AccountItem
  }
}
    ${AccountItemFragmentDoc}`;

/**
 * __useAccountQuery__
 *
 * To run a query within a React component, call `useAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountQuery({
 *   variables: {
 *   },
 * });
 */
export function useAccountQuery(baseOptions?: Apollo.QueryHookOptions<AccountQuery, AccountQueryVariables>) {
        return Apollo.useQuery<AccountQuery, AccountQueryVariables>(AccountDocument, baseOptions);
      }
export function useAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountQuery, AccountQueryVariables>) {
          return Apollo.useLazyQuery<AccountQuery, AccountQueryVariables>(AccountDocument, baseOptions);
        }
export type AccountQueryHookResult = ReturnType<typeof useAccountQuery>;
export type AccountLazyQueryHookResult = ReturnType<typeof useAccountLazyQuery>;
export type AccountQueryResult = Apollo.QueryResult<AccountQuery, AccountQueryVariables>;