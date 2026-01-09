import _ from 'lodash';

export function removeComponents(
    components: Array<{ component: string; id: string; config?: any }>,
    idsToRemove: string[]
): Array<{ component: string; id: string; config?: any }> {
    return _.reject(components, component => _.includes(idsToRemove, component.id));
}
